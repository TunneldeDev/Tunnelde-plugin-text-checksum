import assert from "node:assert/strict";
import { test } from "node:test";
import { calculate as checksum } from "../tool.mjs";

test("checksum hashes exact UTF-8 bytes, including empty and trailing whitespace", () => {
  assert.equal(
    checksum("", {}).text,
    "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  );
  assert.equal(
    checksum("abc", {}).text,
    "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad",
  );
  assert.notEqual(checksum("abc\n", {}).text, checksum("abc", {}).text);
  assert.match(checksum("中", { algorithm: "SHA-512" }).title, /3 bytes/);
  assert.equal(checksum("x", { algorithm: "other" }).error, true);
});