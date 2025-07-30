import { v4 as uuid } from 'uuid';
import fs from 'fs-extra';
import path from 'path';
import Docker from 'dockerode';

const docker = new Docker();

// Get file extension for each language
const getExtension = (language) => {
  switch (language) {
    case 'python':
      return 'py';
    case 'cpp':
      return 'cpp';
    case 'javascript':
      return 'js';
    default:
      throw new Error('Unsupported language');
  }
};

// Get container image & execution commands for each language
const getExecutionConfig = (language, codeFilename) => {
  let image, command;
  switch (language) {
    case 'python':
      image = 'python:3.10-slim';
      command = ['sh', '-c', `python3 ${codeFilename} < input.txt > output.txt`];
      break;
    case 'cpp':
      image = 'gcc:12.2';
      command = ['sh', '-c', `g++ ${codeFilename} -o main && ./main < input.txt > output.txt`];
      break;
    case 'javascript':
      image = 'node:20-slim';
      command = ['sh', '-c', `node ${codeFilename} < input.txt > output.txt`];
      break;
    default:
      throw new Error('Unsupported language');
  }
  return { image, command };
};

// Main function that runs the code in Docker
export const runCode = async (language, userCode, testCaseInput) => {
  const jobId = uuid();
  const folderPath = path.join(process.cwd(), 'temp', jobId);

  try {
    // Prepare the temp directory and write files
    await fs.ensureDir(folderPath);

    const ext = getExtension(language);
    const codeFilename = `main.${ext}`;
    const codeFilePath = path.join(folderPath, codeFilename);

    await fs.writeFile(codeFilePath, userCode);
    await fs.writeFile(path.join(folderPath, 'input.txt'), testCaseInput);

    const { image, command } = getExecutionConfig(language, codeFilename);

    // Run container
    const container = await docker.createContainer({
      Image: image,
      Cmd: command,
      Tty: false,
      WorkingDir: '/app',
      HostConfig: {
        Binds: [`${folderPath}:/app`], // Bind local temp dir to /app in container
        AutoRemove: true               // Remove container after execution
      }
    });

    await container.start();
    await container.wait();

    // Read the output file
    const outputFilePath = path.join(folderPath, 'output.txt');
    const output = await fs.readFile(outputFilePath, 'utf-8');

    return { success: true, output };
  } catch (err) {
    return { success: false, error: err.message };
  } finally {
    // Always clean up temp directory
    await fs.remove(folderPath);
  }
};
