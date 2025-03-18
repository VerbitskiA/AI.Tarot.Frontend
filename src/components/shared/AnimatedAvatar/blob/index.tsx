"use client"

import React, { useMemo, useRef } from "react"
import vertexShader from "./vertexShader"
import fragmentShader from "./fragmentShader"
import { useFrame } from "@react-three/fiber"

const Blob = () => {
  const mesh = useRef(null)
  const uniforms = useMemo(() => {
    return {
      u_time: { value: 0 },
      u_intensity: { value: 0.3 },
    }
  }, [])

  useFrame((state) => {
    const { clock } = state
    if (mesh.current) {
      // TODO
      // @ts-ignore
      mesh.current.material.uniforms.u_time.value =
        0.4 * clock.getElapsedTime()
        // TODO
      // @ts-ignore
      mesh.current.material.uniforms.u_intensity.value = 0.3
    }
  })

  return (
    <mesh ref={mesh} scale={1.5} position={[0, 0, 0]}>
      <icosahedronGeometry args={[2, 20]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={true} // Устанавливаем прозрачность
        opacity={0.4} // прозрачность
      />
    </mesh>
  )
}

export default Blob
