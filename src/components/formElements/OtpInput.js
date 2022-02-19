import { View, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
// import css from '../commonCss';

const inputStyle = {
  borderColor: '#ccc',
  borderWidth: 1,
  borderRadius: 10,
  width: '15%',
  padding: 10,
  marginRight: 10,
  textAlign: 'center'
};

function NumberInput(props) {
  const updateValue = (val) => {
    console.log(val);
    const { onChange } = props;
    if (onChange) {
      onChange(val);
    }
  };

  return (
    <TextInput
      style={inputStyle}
      keyboardType="numeric"
      maxLength={1}
      onChange={updateValue}
    />
  );
}

function OtpInput(props) {
  const [codeOne, setCodeOne] = useState(null);
  const [codeTwo, setCodeTwo] = useState(null);
  const [codeThree, setCodeThree] = useState(null);
  const [codeFour, setCodeFour] = useState(null);

  const isNotNull = (val) => val !== null;

  useEffect(() => {
    const FIELDS = [codeOne, codeTwo, codeThree, codeFour];
    if (FIELDS.every(isNotNull)) {
      const { onChange } = props;
      onChange(FIELDS.join(''));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const FIELDS_ACTION = [setCodeOne, setCodeTwo, setCodeThree, setCodeFour];

  return (
    <View>
      {FIELDS_ACTION.map((setValue) => <NumberInput onChange={setValue} />)}
    </View>
  );
}

export default OtpInput;
