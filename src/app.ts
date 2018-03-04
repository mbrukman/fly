import { parseConfig } from './app/config'
import { ivm } from './';

export interface ReleaseInfo {
  app: string
  version: number
  source: string
  source_hash: string
  source_map?: string
  config: any
  secrets: any
  env: string
}

export class App {
  releaseInfo: ReleaseInfo
  private _config: any

  constructor(releaseInfo: ReleaseInfo) {
    this.releaseInfo = releaseInfo
  }

  get name() {
    return this.releaseInfo.app
  }

  get env() {
    return this.releaseInfo.env
  }

  get config() {
    if (this._config)
      return this._config
    this._config = this.releaseInfo.config
    parseConfig(this._config, this.releaseInfo.secrets)
    return this._config
  }

  get source() {
    return this.releaseInfo.source
  }

  get version() {
    return this.releaseInfo.version
  }

  get sourceHash() {
    return this.releaseInfo.source_hash
  }

  get sourceMap() {
    return this.releaseInfo.source_map
  }

  forV8() {
    return new ivm.ExternalCopy({
      name: this.name,
      config: this.config,
      version: this.version,
      env: this.env
    }).copyInto({ release: true })
  }
}