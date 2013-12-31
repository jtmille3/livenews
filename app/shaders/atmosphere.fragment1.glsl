uniform float c;
uniform float p;
varying vec3 vNormal;
void main() 
{
  float intensity = pow( c - dot( vNormal, vec3( 0.0, 0.0, 1.0 ) ), p ); 
  gl_FragColor = vec4( 1.0, 1.0, 1.0, 1.0 ) * intensity;
}
