import { FileSystem, Uri, workspace, window } from 'vscode';
import { TextEncoder } from 'util';
export class Config {

    private readonly _path: string | null | undefined;
    private readonly _width: number | undefined;
    private readonly _height: number | undefined;
    private readonly _configUri: Uri;
    private readonly _fs: FileSystem;

    constructor(fs: FileSystem, configTitle: string) {
        this._width = workspace.getConfiguration(configTitle).get('BoxWidth');
        this._height = workspace.getConfiguration(configTitle).get('BoxHeight');
        this._path = workspace.getConfiguration(configTitle).get('path');
        this._configUri = Uri.parse('file:///' + this._path + '/dosbox.conf');
        this._fs = fs;
    }

    public writeConfig(autoExec:string) {
        const configContent = `[sdl]
windowresolution=${this._width}x${this._height}
output=opengl
[autoexec]
mount x ${this._path}
set PATH=%PATH%;x:\\;
${autoExec}`;
        this._fs.writeFile(this._configUri, new TextEncoder().encode(configContent));
    }

    public get path(): string | undefined | null {
        return this._path;
    }

}