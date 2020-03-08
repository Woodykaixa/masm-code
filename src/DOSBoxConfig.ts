import { FileSystem, Uri } from 'vscode';
import { TextEncoder } from 'util';
export class Config {
    private readonly ConfigContent: string;
    constructor(width: number, height: number, autoExec?: string) {
        this.ConfigContent = `[sdl]
windowresolution=${width}x${height}
output=opengl
[autoexec]
${autoExec !== undefined ? autoExec : ''}`;
    }

    public writeConfig(fs: FileSystem, uri: Uri) {
        fs.writeFile(uri, new TextEncoder().encode(this.ConfigContent));
    }
}