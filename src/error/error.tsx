import { ErrorCode } from './code';
import { ErrorDescription } from './desc';

export class UIKitError extends Error {
  code: ErrorCode;
  desc: ErrorDescription;
  constructor(params: {
    code: ErrorCode;
    extra?: string;
    options?: ErrorOptions;
  }) {
    super(params.extra, params.options);
    this.code = params.code;
    this.desc = this._desc(this.code);
  }

  private _desc(code: ErrorCode): ErrorDescription {
    let ret = ErrorDescription.none;
    switch (code) {
      case ErrorCode.none:
        ret = ErrorDescription.none;
        break;
      case ErrorCode.common:
        ret = ErrorDescription.common;
        break;
      case ErrorCode.enum:
        ret = ErrorDescription.enum;
        break;
      case ErrorCode.existed:
        ret = ErrorDescription.existed;
        break;
      default:
        break;
    }
    return ret;
  }

  public toString(): string {
    return `code: ${this.code}\n
    desc: ${this.desc}\n
    extra: ${this.message}`;
  }
}
