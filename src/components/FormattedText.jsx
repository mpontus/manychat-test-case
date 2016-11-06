import React from 'react';

const FormattedText = ({text}) => (
  <div>
    {text.split('\n').map((line, n) => <p key={n}>{line}</p>)}
  </div>
);

export default FormattedText;
