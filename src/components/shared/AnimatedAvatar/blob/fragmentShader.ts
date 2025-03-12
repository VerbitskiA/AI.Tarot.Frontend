const fragmentShader = `
uniform float u_intensity;
uniform float u_time;

varying vec2 vUv;
varying float vDisplacement;

void main() {
    // Уменьшаем частоту пульсации еще больше
    float alpha = 0.5 + 0.5 * sin(u_time * 1.0 + length(vUv - 0.5) * 10.0); // Замедлена частота для более медленного пульсирования

    // Модификация цвета для визуализации
    vec3 color = vec3(abs(vUv - 0.5) * 2.0, 1.0); // Цвет по-прежнему зависит от текстурных координат

    // Усилим свечение
    vec3 emission = vec3(1.0); // Белое свечение
    emission *= sin(u_time * 2.0) * 0.8 + 0.2; // Замедлена амплитуда и частота свечения

    gl_FragColor = vec4(color + emission, alpha); // Применяем измененный альфа-канал и добавляем усиленное свечение
}

`;

export default fragmentShader;
