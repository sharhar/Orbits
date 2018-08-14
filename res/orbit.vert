#version 420 core
#extension GL_ARB_separate_shader_objects : enable

layout ( location = 0 ) in vec2 position;
layout ( location = 1 ) in vec2 uv;

layout( std140, binding = 0 ) uniform ViewMat {
	mat4 matv;
	mat4 matp;
	float scale;
} TRANS;

layout( location = 0 ) out struct vert_out {
    vec2 uv;
} OUT;

void main(void) {
	vec4 finalPos = TRANS.matp * TRANS.matv * vec4(position.xy, 0.0, 1.0);
	gl_Position = vec4(finalPos.x, -finalPos.y, finalPos.z, 1.0);
	OUT.uv = TRANS.scale*uv;
}
