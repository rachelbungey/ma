varying float vReflectionFactor;

void main() {
  vec4 refractedColor = vec4( 0.2, 0.2, 0.2, 1.0 );
  vec4 reflectedColor = vec4( 0.8, 0.8, 0.8, 1.0 );

  gl_FragColor = mix( refractedColor, reflectedColor, clamp( vReflectionFactor, 0.0, 1.0 ) );
}
