import pkg from '../../package.json';

export default async ({ reply }) => {
  reply.send(`${reply.link(pkg.homepage, pkg.name)} v${pkg.version}`);
};
