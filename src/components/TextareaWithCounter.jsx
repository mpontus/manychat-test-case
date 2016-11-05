import React from 'react';

const TextareaWithCounter = ({
  className,
  textareaClassName,
  counterClassName,
  ...textareaProps,
}) => {

  const { maxLength, value } = textareaProps;
  const charsLeft = maxLength && maxLength - value.length;

  return (
    <div className={className}>
      <textarea
        className={textareaClassName}
        {...textareaProps}
      />
      { maxLength &&
        <div className={counterClassName}>
          {charsLeft} characters left
        </div> }
    </div>
  );
}

export default TextareaWithCounter;
