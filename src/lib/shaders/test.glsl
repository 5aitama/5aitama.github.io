#version 300 es

#ifdef FRAG
precision highp float;
out vec4 outColor;
void main() {
  outColor = vec4(0.7, 0.7, 0.7, 1);
}
#else
uniform mat4 view;
uniform mat4 proj;
uniform float time;
uniform float scroll_time;

layout(location = 0) in mat4 model;
layout(location = 4) in vec3 a_pos;

void main() {
  vec3 pos = model[3].xyz;

  // vec2 r = vec2(cos(pos.x * 0.3), sin(pos.z * 0.3));

  float s = max(0.0, 1.0 - length(pos) * 0.03) * min(1.0, scroll_time * 2.0);
  float scale = s;// sin(0.25 * length(pos) - time * 0.001) * s;

  // Extract camera rotation from view matrix
    mat3 rot = transpose(mat3(
        view[0].xyz,
        view[1].xyz,
        view[2].xyz
    ));

    vec3 cameraRight = rot[0];
    vec3 cameraUp    = rot[1];

    // Build the billboard vertex
    vec3 worldPos = pos 
                  + a_pos.x * scale * cameraRight 
                  + a_pos.y * scale * cameraUp
                  + vec3(0.0, sin(0.25 * length(pos) - time * 0.001), 0.0);

    gl_Position = proj * view *  vec4(worldPos, 1.0);

}
#endif