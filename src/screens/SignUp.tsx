import { Center, Heading, Image, ScrollView, Text, VStack } from "native-base";

import BackgroundImg from '@assets/background.png'
import LogoSvg from '@assets//logo.svg'
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { useNavigation } from "@react-navigation/native";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"


type FormDataProps = {
  name: string;
  email: string;
  password: string;
  password_confirm: string;
}

const validationSchema = yup.object({
  name: yup.string().required('Informe o nome.'),
  email: yup.string().required('Informe o email').email('Email inválido.'),
  password: yup.string().required('Informe a senha').min(6,'A senha deve ter pelo menos 6 digitos.'),
  password_confirm: yup.string().required('Informe a confirmação de senha').min(6,'A confirmação deve ter pelo menos 6 digitos.').oneOf([yup.ref('password')], 'As senhas não são iguais.'),
})

export function SignUp(){

  const {control, handleSubmit, formState: {errors}} = useForm<FormDataProps>({
    resolver: yupResolver(validationSchema)
  });

  const navigation = useNavigation();

  function handleGoBack(){
    navigation.goBack();
  }
  function handleSignUp(data: FormDataProps){
    console.log(data)
  }
  return(
    <ScrollView contentContainerStyle={{flexGrow: 1}} showsVerticalScrollIndicator={false}>
      <VStack flex={1} px={10}>
        <Image 
          source={BackgroundImg} 
          defaultSource={BackgroundImg} 
          alt="Pessoas treinando"
          resizeMode="contain"
          position="absolute"
        />

        <Center my={24}>
          <LogoSvg />
          <Text color="gray.100" fontSize="sm">
            Treine sua mente e seu corpo.
          </Text>
        </Center>

        <Center>
          <Heading color="gray.100" fontSize={"xl"} mb={6} fontFamily={"heading"}>
            Crie sua conta
          </Heading>

          <Controller 
            control = {control}
            name="name"
            render={({field:{onChange, value}})=>(
              <Input 
                placeholder="Nome"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.name?.message}
              />
            )}
          
          />


          <Controller 
            control = {control}
            name="email"
            render={({field:{onChange, value}})=>(
              <Input 
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.email?.message}
              />
            )}
          
          />

          <Controller 
            control = {control}
            name="password"
            render={({field:{onChange, value}})=>(
              <Input 
                placeholder="Senha"
                onChangeText={onChange}
                value={value}
                secureTextEntry
                errorMessage={errors.password?.message}
              />
            )}
          
          />
          

          <Controller 
            control = {control}
            name="password_confirm"
            render={({field:{onChange, value}})=>(
              <Input 
                placeholder="Confirmar Senha"
                onChangeText={onChange}
                value={value}
                secureTextEntry
                onSubmitEditing={handleSubmit(handleSignUp)}
                returnKeyType="send"
                errorMessage={errors.password_confirm?.message}
              />
            )}
          
          />
          

          

          

          <Button 
            title="Criar e Acessar"
            onPress={handleSubmit(handleSignUp)}
          />
        </Center>

        <Button 
          title="Voltar para o Login" 
          variant={"outline"} 
          mt={12}
          onPress={handleGoBack}
        />
      </VStack>
    </ScrollView>
  )
}