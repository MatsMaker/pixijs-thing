import { Container } from "pixi.js";
import { isString } from "../utils";
import { TDot } from "./tDot";
import { nineAnchor, NINE_ANCHOR } from "./nineAnchor";
import { insertThing, removeThing } from "./View.module";

export default class Thing extends Container {
  _uuid;
  _refs;
  _tNineTransform;

  constructor(name, uuid) {
    super();
    this.name = name;
    this._uuid = uuid;
    this._refs = {};

    this._tNineTransform = NINE_ANCHOR.LEFT_TOP;
    this.tOffset = new TDot();

    this.tGetRef.bind(this);
    this.tSaveRef.bind(this);
    this.tDeleteRef.bind(this);
    this.tAddChild.bind(this);
    this.tRemoveChild.bind(this);
    this.tRemoveChildren.bind(this);
    this.tNineAnchor.bind(this);
  }
  get uuid() {
    return this._uuid;
  }
  tSaveRef(key, ref, onlyChild = true) {
    if (this.tHasChild(ref) || !onlyChild) {
      this._refs[key] = ref;
      return ref;
    } else {
      return undefined;
    }
  }
  tGetRef(...key) {
    const res = key.map((k) => this._refs[k]);
    if (key.length > 1) {
      return res;
    } else if (res) {
      return res[0];
    }
    return res;
  }
  tGetAllRef() {
    return Object.keys(this._refs);
  }
  tDeleteRef(keyRef) {
    // give props as [key] as string Or [ref] as any other
    const isKey = isString(keyRef);
    if (isKey) {
      delete this._refs[keyRef];
    } else {
      for (const key in this._refs) {
        if (this._refs[key] === keyRef) {
          delete this._refs[key];
        }
      }
    }
  }
  tAddChild(fThing, fSelector, keySaveRef) {
    const child = insertThing(this, fThing, fSelector);
    if (keySaveRef !== undefined) {
      this.tSaveRef(keySaveRef, child);
    }
    return child;
  }
  tRemoveChild(ref) {
    this.tDeleteRef(ref);
    removeThing(ref);
    return this;
  }
  tRemoveChildren() {
    this.children.forEach((r) => this.tRemoveChild(r));
    return this;
  }
  tNineAnchor(nineSize, nineTransformType = this._tNineTransform) {
    this._tNineTransform = nineTransformType;
    nineAnchor(this, nineSize, this._tNineTransform);
  }
  tHasChild(ref) {
    return Boolean(this.children.find((c) => c === ref));
  }
}
