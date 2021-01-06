"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.instance = exports.GeneratorRegistry = void 0;
const Generator_1 = require("./Generator");
const ConstructorRegistry_1 = require("@civ-clone/core-registry/ConstructorRegistry");
class GeneratorRegistry extends ConstructorRegistry_1.ConstructorRegistry {
    constructor() {
        super(Generator_1.default);
    }
}
exports.GeneratorRegistry = GeneratorRegistry;
exports.instance = new GeneratorRegistry();
exports.default = GeneratorRegistry;
//# sourceMappingURL=GeneratorRegistry.js.map