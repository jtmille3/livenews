uniform sampler2D tCityLights;

uniform vec3 tSunLight;
uniform vec3 uCityLightsColor;
uniform float uCityLightsIntensity;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vOriginalNormal;

void main( void ) {
  vec3 dirDiffuse = vec3( 0.0 );
  vec3 dirSpecular = vec3( 0.0 );

  vec4 lDirection = viewMatrix * vec4( tSunLight, 0.0 );
  vec3 dirVector = normalize( lDirection.xyz );

  float directionalLightWeightingFull = max(-1.0 * dot( vOriginalNormal, dirVector ), 0.0);
  float directionalLightWeightingHalf = max(-1.0 * 0.5 * dot( vOriginalNormal, dirVector ) + 0.5, 0.0);

  vec3 dirDiffuseWeight = mix( vec3( directionalLightWeightingFull ), vec3( directionalLightWeightingHalf ), vec3(0.0) );
  dirDiffuse += uCityLightsColor * uCityLightsColor * dirDiffuseWeight;
  
  vec4 texelColor = texture2D( tCityLights, vUv );
  gl_FragColor = gl_FragColor + (uCityLightsIntensity * vec4(dirDiffuse, 1.0) * (texelColor.x / 1.0));
  // gl_FragColor = texelColor;
}