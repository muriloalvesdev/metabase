/* @flow */

import type StructuredQuery from "../StructuredQuery";

export default class MBQLArrayClause extends Array {
  _index: number;
  _query: StructuredQuery;

  constructor(mbql: Array<any>, index: number, query: StructuredQuery) {
    super(...mbql);
    _private(this, "_index", index);
    _private(this, "_query", query);
  }

  set(mbql) {
    return new this.constructor(mbql, this._index, this._query);
  }

  replace(replacement: any): StructuredQuery {
    throw new Error("Abstract method `replace` not implemented");
  }

  /**
   * returns the parent query object
   */
  query(): StructuredQuery {
    return this._query;
  }

  /**
   * replaces the previous clause with this one and propagates an update, recursively
   */
  update(...args: any) {
    return this.replace(this).update(undefined, ...args);
  }

  /**
   * return the Metadata instance from the linked Query
   */
  metadata() {
    return this._query.metadata();
  }
}

export class MBQLObjectClause {
  _index: number;
  _query: StructuredQuery;

  constructor(mbql: Array<any>, index: number, query: StructuredQuery) {
    Object.assign(this, mbql);
    _private(this, "_index", index);
    _private(this, "_query", query);
  }

  set(mbql) {
    return new this.constructor(mbql, this._index, this._query);
  }

  replace(replacement: any): StructuredQuery {
    throw new Error("Abstract method `replace` not implemented");
  }

  /**
   * returns the parent query object
   */
  query(): StructuredQuery {
    return this._query;
  }

  /**
   * replaces the previous clause with this one and propagates an update, recursively
   */
  update(...args: any) {
    return this.replace(this).update(undefined, ...args);
  }

  /**
   * return the Metadata instance from the linked Query
   */
  metadata() {
    return this._query.metadata();
  }
}

function _private(object, key, value) {
  // this prevents properties from being serialized
  Object.defineProperty(object, key, { value: value, enumerable: false });
}
