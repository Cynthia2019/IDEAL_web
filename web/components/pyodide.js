import { useContext, useEffect, useState } from 'react'
import Head from 'next/head'
import { PyodideContext } from './pyodide-provider'

export default function Pyodide({
  id,
  pythonCode,
  loadingMessage = 'loading...',
  evaluatingMessage = 'evaluating...'
}) {
  const indexURL = 'https://cdn.jsdelivr.net/pyodide/dev/full/'
  const {
    pyodide,
    hasLoadPyodideBeenCalled,
    isPyodideLoading,
    setIsPyodideLoading
  } = useContext(PyodideContext)
  const [pyodideOutput, setPyodideOutput] = useState(evaluatingMessage)

  // load pyodide wasm module and initialize it
  useEffect(() => {
    if (!hasLoadPyodideBeenCalled.current) {
      // immediately set hasLoadPyodideBeenCalled ref, which is part of context, to true
      // this prevents any additional Pyodide components from calling loadPyodide a second time
      hasLoadPyodideBeenCalled.current = true
      ;(async function () {
        pyodide.current = await globalThis.loadPyodide({ indexURL })
        await pyodide.current.loadPackage(["numpy", "matplotlib", "scipy"]);
        console.log(
            pyodide.current.runPython(`
        import sys
        sys.version
    `))
        // updating value of isPyodideLoading triggers second useEffect
        setIsPyodideLoading(false)
      })()
    }
    // pyodide and hasLoadPyodideBeenCalled are both refs and setIsPyodideLoading is a setState function (from context)
    // as a result, these dependencies will be stable and never cause the component to re-render
  }, [pyodide, hasLoadPyodideBeenCalled, setIsPyodideLoading])

  // evaluate python code with pyodide and set output
  useEffect(() => {
    if (!isPyodideLoading) {
      const evaluatePython = async (pyodide, pythonCode) => {
        try {
          return await pyodide.runPython(pythonCode)
        } catch (error) {
          console.error(error)
          return 'Error evaluating Python code. See console for details.'
        }
      }
      ;(async function () {
        setPyodideOutput(await evaluatePython(pyodide.current, pythonCode))
      })()
    }
    // component re-renders when isPyodideLoading changes, which is set with first useEffect and updated via context
  }, [isPyodideLoading, pyodide, pythonCode])

  return (
    <>
      <Head>
        <script src={`${indexURL}pyodide.js`}/>
      </Head>
      <div id={id}>
        Pyodide Output: {isPyodideLoading ? loadingMessage : pyodideOutput}
      </div>
    </>
  )
}