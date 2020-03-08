import { FileSystem, Uri, FileType } from 'vscode';

/**
 * 检查给定的目录中的文件，返回路径中不存在的文件名列表。
 * @param fs vscode文件系统
 * @param path 路径
 * @param fileList 查询文件列表
 */
export const checkMissingFile = (fs: FileSystem, path: string, fileList: string[]) => {
    const DirectoryUri = Uri.parse('file:///' + path);
    return fs.createDirectory(DirectoryUri).then(() => {
        return fs.readDirectory(DirectoryUri);
    }).then(entries => {
        const toDownload = fileList.concat();
        entries.forEach(entry => {
            const i = toDownload.indexOf(entry[0]);
            if (i!==-1) {
                toDownload.splice(i, 1);
            }
        });
        return toDownload;
    });
};