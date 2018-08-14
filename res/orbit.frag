#version 420 core
#extension GL_ARB_separate_shader_objects : enable

layout( location = 0 ) in struct frag_in {
    vec2 uv;
} IN;

layout( std140, binding = 1 ) uniform BgColor {
	vec3 color;
} bg;

layout (location = 0) out vec4 outColor;

float abs_c (float value) {
	if(value < 0.0) {
		return -value;
	}

	return value;
}

float orbit_d3_z2(vec2 coord) {
	float total = 0;
	float dz = 0.1;
	for(float z = -30; z <= 30; z += dz) {
	    float r = sqrt(coord.x*coord.x + coord.y*coord.y + z*z);
		float r_f = (4*r*r*exp(r/-3)/(81*sqrt(30)));
		float a_f = sqrt(15.0/(16.0*3.14159))*(2*coord.x*coord.x - (z*z + coord.y*coord.y))/(r*r);
		//float a_f = sqrt(5.0/(16.0*3.14159))*(coord.x*coord.x - coord.y*coord.y)/(r*r);
		total += abs_c(dz*r_f*a_f);
	}
	return total;
}

float orbit_s1(vec2 coord) {
	float total = 0;
	float dz = 0.1;
	for(float z = -10; z <= 10; z += dz) {
		total += dz*exp(-1*sqrt(coord.x*coord.x + coord.y*coord.y + z*z))/sqrt(3.14159);
	}
	return total;
}

void main(void) {
	outColor = mix(vec4(bg.color, 1.0), vec4(0.0, 1.0, 0.0, 1.0), orbit_d3_z2(IN.uv));
}
