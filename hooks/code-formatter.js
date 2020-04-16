import hljs from 'highlight.js';

export const codeFormatter = (code, languages) => {

    const highlightedCode = hljs.highlightAuto(code).value;
    return {__html: highlightedCode};
};
