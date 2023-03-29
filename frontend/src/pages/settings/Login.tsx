import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { TextInput, Button as PaperButton } from 'react-native-paper';
import { useNavigate } from 'react-router-native';

import Button from '../../components/shared/UI/Button';

import { useLogin } from '../../util/hooks/useLogin';
import { UserContext, UserContextType } from '../../util/context/UserContext';
import employeeService from '../../util/services/employeeService';
import cafeService from '../../util/services/cafeService';

interface LoginProps {
  loginType: string;
  onExit: () => void;
}

const Login: React.FC<LoginProps> = (props) => {
  const { setUser } = React.useContext<UserContextType>(UserContext);

  const redirect = useNavigate();

  const loginHandler = async () => {
    if (props.loginType === 'Login') {
      const user = await employeeService.login(formData);
      setUser(user);

      setTimeout(() => {
        redirect('/cafe');
      }, 1000);
    }

    if (props.loginType === 'Register') {
      try {
        await employeeService.signUp(formData);

        const user = await employeeService.login(formData);
        setUser(user);

        await cafeService.createCafe(formData, user);

        setTimeout(() => {
          redirect('/cafe');
        }, 1000);
      } catch (error: any) {
        console.log(error.message);
      }
    }
  };

  const formData = useLogin();

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.inputs}>
          <TextInput
            placeholder="Name"
            style={styles.input}
            value={formData.name}
            onChangeText={formData.setName}
          />
          <TextInput
            placeholder="Username"
            style={styles.input}
            value={formData.username}
            onChangeText={formData.setUsername}
          />
          <TextInput
            placeholder="Password"
            style={styles.input}
            value={formData.password}
            onChangeText={formData.setPassword}
            secureTextEntry
          />
          {props.loginType === 'Register' && (
            <>
              <TextInput
                placeholder="Cafe name"
                style={styles.input}
                value={formData.cafeName}
                onChangeText={formData.setCafeName}
              />
              <TextInput
                placeholder="Cafe currency abbreviation/symbol"
                style={styles.input}
                value={formData.cafeCurrency}
                onChangeText={formData.setCafeCurrency}
              />
            </>
          )}
          <Button
            touchOpacity={0.85}
            containerStyle={undefined}
            textStyle={styles.buttonText}
            onPress={loginHandler}
          >
            {props.loginType}
          </Button>
        </View>
      </ScrollView>
      <View style={styles.cancel}>
        <PaperButton
          onPress={props.onExit}
          icon={{
            uri: 'https://th.bing.com/th/id/R.c63ac7690d2911f66419206dce02c142?rik=su2XbdpSJOeOLA&riu=http%3a%2f%2fwww.pngall.com%2fwp-content%2fuploads%2f4%2fCancel-PNG-Clipart-180x180.png&ehk=Hvowxm4TCRFx4RYkpRmf5EtRwvBM3pvp6IE9EGrL3A8%3d&risl=&pid=ImgRaw&r=0'
          }}
        >
          {' '}
        </PaperButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    padding: 40,
    backgroundColor: 'white',
    zIndex: 1,
    alignItems: 'center',
    marginTop: 110,
    justifyContent: 'space-between'
  },
  inputs: {
    width: '100%',
    alignItems: 'center'
  },
  input: {
    marginBottom: 20,
    width: 350
  },
  buttonText: {
    backgroundColor: '#272a31',
    color: 'white',
    padding: 15,
    borderRadius: 2,
    width: 350,
    textAlign: 'center',
    fontSize: 15
  },
  cancel: { marginLeft: 15, marginTop: 25 },
  scroll: { justifyContent: 'space-between' }
});

export default Login;
