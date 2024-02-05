<script setup lang="ts">
import { ref } from 'vue'
import init, { greet } from 'my-crate';

// This throws the following errors:
// Aborted(`Module.asm` has been replaced by `wasmExports` (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name))
// pdfium-render::initialize_pdfium_render(): Unable to locate wasmTable
async function initWasm(){
  let wasm = await init();
  greet("Test Issue")
}

</script>

<template>
  <div>
    <div>
  <pre>
    {{ initWasm }}
  </pre>
  <button @click="initWasm">Run initWasm</button>
  </div>
  </div>
</template>

<style>
  pre {
    text-align: left;
  }
</style>