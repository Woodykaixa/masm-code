import { FileSystem, Uri, workspace, window } from 'vscode';
import { TextEncoder } from 'util';
export class Config {

    private readonly _path: string | null | undefined;
    private readonly _width: number | undefined;
    private readonly _height: number | undefined;
    private readonly _configTitle: string;
    private readonly _configUri: Uri;
    private readonly _fs: FileSystem;

    constructor(fs: FileSystem, configTitle: string, storage: string) {
        this._configTitle = configTitle;
        this._width = workspace.getConfiguration(configTitle).get('BoxWidth');
        this._height = workspace.getConfiguration(configTitle).get('BoxHeight');
        this._path = storage;
        this._configUri = Uri.parse('file:///' + this._path + '/dosbox.conf');
        this._fs = fs;
    }

    public readExtensionConfig(title: string): any {
        return workspace.getConfiguration(this._configTitle).get(title);
    }

    public writeConfig(autoExec: string) {
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