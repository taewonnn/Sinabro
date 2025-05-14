import fs from 'fs-extra';
import Mustache from 'mustache';
import frontMatter from 'front-matter';
import Showdown from 'showdown';
import config from '../config.js';

const DIST = config.build.dist;
const PAGES = config.build.pages;
const CONTENTS = config.build.contents;
const CONTENTS_SLUG = config.build.contenstsSlug;

async function renderFile(source, dest) {
    const recentPosts = await getRecentPosts();

    const file = await fs.readFile(source);
    const result = Mustache.render(file.toString(), { ...config, recentPosts });
    await fs.writeFile(dest, result);
}

async function getRecentPosts() {
    const files = await fs.readdir(CONTENTS);

    const result = [];
    for (const file of files) {
        const { attributes } = frontMatter((await fs.readFile(`${CONTENTS}/${file}/index.md`)).toString());
        result.push({ ...attributes, path: `/${CONTENTS_SLUG}/${attributes.slug}` });
    }

    return result;
}

async function buildHtmlFiles() {
    // pages에 있는 파일 Dist에
    const files = await fs.readdir(PAGES);
    // console.log(files);

    for (const file of files) {
        // dist 폴더로 복사
        if (file === 'index.html') {
            await renderFile(`${PAGES}/${file}`, `${DIST}/${file}`);
        } else {
            const folderName = file.split('.html')[0];
            await fs.mkdir(`${DIST}/${folderName}`);
            await renderFile(`${PAGES}/${file}`, `${DIST}/${folderName}/index.html`);
        }
    }
}

async function buildContentsFiles() {
    const files = await fs.readdir(CONTENTS);
    await fs.mkdir(`${DIST}/${CONTENTS_SLUG}`);
    console.log('content files', files);

    for (const file of files) {
        const { attributes, body } = frontMatter((await fs.readFile(`${CONTENTS}/${file}/index.md`)).toString());

        const template = await fs.readFile('templates/post.html');
        const bodyHtml = new Showdown.Converter().makeHtml(body);
        const html = Mustache.render(template.toString(), {
            ...config,
            post: config.updatePost({ ...attributes, body: bodyHtml }),
        });

        await fs.mkdir(`${DIST}/${CONTENTS_SLUG}/${file}`);
        await fs.writeFile(`${DIST}/${CONTENTS_SLUG}/${file}/index.html`, html);
    }
}

async function build() {
    await fs.mkdir(DIST);
    // build  html files
    await buildHtmlFiles();

    // build contents files
    await buildContentsFiles();
}

build();
