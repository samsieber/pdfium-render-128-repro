<script setup lang="ts">
import { ref } from 'vue'
import init, { greet } from 'my-crate';
import {initialize_pdfium_render} from "my-crate";
import PDFiumModule from "pdfium";

async function initWasm(){
  let wasm = await init();
  let pdfiumModule = await PDFiumModule()
  let wasmModule = wasm;
  initialize_pdfium_render(pdfiumModule, wasmModule, false); 
  greet("Test Issue")
}

async function hackyInit(){
  let wasm = await init();
  let pdfiumModule = await PDFiumModule()
  let wasmModule = wasm;
  (window as any).wasmTable = pdfiumModule.wasmExports.__indirect_function_table
  initialize_pdfium_render(pdfiumModule, wasmModule, false); 
  greet("Test Issue")
}

</script>

<template>
  <div>
    <div>
  <pre>
    // This logs the following errors:
    // Aborted(`Module.asm` has been replaced by `wasmExports` (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name))
    // pdfium-render::initialize_pdfium_render(): Unable to locate wasmTable
    {{ initWasm }}
  </pre>
  <button @click="initWasm">Run initWasm</button>
  </div>  
  <hr>
  <div>
  <pre>
    // Manually attaching to the window prevents the errors
    {{ hackyInit }}
  </pre>
  <button @click="hackyInit">Run hackyInit</button>
  </div>
  </div>
</template>

<style>
  pre {
    text-align: left;
  }
</style>