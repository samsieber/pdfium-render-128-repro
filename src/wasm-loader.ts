import init, {initialize_pdfium_render} from "my-crate";
import PDFiumModule from "pdfium";

// Satisfy the typechecker
export type {}

// Throws no errors
export async function hackyInit(){
  let wasm = await init();
  let pdfiumModule = await PDFiumModule()
  let wasmModule = wasm;
  // This is a terrible hack...
  (window as any).wasmTable = pdfiumModule.wasmExports.__indirect_function_table
  initialize_pdfium_render(pdfiumModule, wasmModule, false); 
}

// This throws the following errors:
// Aborted(`Module.asm` has been replaced by `wasmExports` (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name))
// pdfium-render::initialize_pdfium_render(): Unable to locate wasmTable
export async function brokenInit(){
    let wasm = await init();
    let pdfiumModule = await PDFiumModule()
    let wasmModule = wasm;
    initialize_pdfium_render(pdfiumModule, wasmModule, false); 
  }