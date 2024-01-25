#!/usr/bin/env node

import yargs from 'yargs';

import { nextBuildNumber, sortByBuildNumber } from './sort';
import {getLinks } from './links';


interface Args {
    dependency: string;
    depVersion: string; 
    platform: string;
    basePath: string;
}


const args = yargs(process.argv.slice(2))
  .usage('Usage: $0 <command> [options]')
  .option('dependency', {
    alias: 'd',
    describe: 'Dependency to search for',
    demandOption: true,
    type: 'string',
  })
  .option('depVersion', {
    alias: 'v',
    describe: 'Dependency version to search, do not include build number (e.g. 2.3.4)',
    demandOption: true,
    type: 'string',
  })
  .option('platform', {
    alias: 'p',
    describe: 'Platform (ios|android)',
    demandOption: true,
    choises: ['ios', 'android'],
  })
  .option('basePath', {
    alias: 'b',
    describe: 'Base path to search for dependencies in',
    default: 'https://www.google.com',
    type: 'string',
  })
  .help()
  .argv as Args;



const url = `${args.basePath}/${args.platform}/${args.depVersion}`

const links = getLinks(url, 's')
  .then(links => {
   console.log(nextBuildNumber(links))
  })
  .catch(error => {
    throw new Error(`${error.message}: url ${url}`)
  });
