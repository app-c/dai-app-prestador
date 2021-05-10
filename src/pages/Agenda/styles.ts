import { FlatList } from 'react-native'
import styled from 'styled-components/native'
import { cores } from '../../utils/ferramentas'
import { Colors } from '../utils'
import {Response} from './index'

export const Container = styled.View`
   flex: 1;
   padding: 25px;
   align-items: center;
   background: ${cores.rosa};
`

export const Title = styled.Text`
   font-size: 40px;
`

export const List = styled(FlatList as new () => FlatList<Response>)`
   width: 100%;   
`
export const ContainerAgenda = styled.View`
   margin-top: 10px;
   background: ${cores.branco};
   width: 100%;
   height: 150px;
   border-radius: 12px;
   align-items: center;
   padding: 15px;
`

export const AgendaView = styled.View`
   width: 100%;
   flex-direction: row;
`

export const ContainerElement = styled.View``

export const ContainerAvatart = styled.View`
   width: 120px;
`

export const Avatar = styled.Image`
   background: black;
   width: 90px;
   height: 90px;
   border-radius: 50px;
`

export const ContainerText = styled.View`
   padding: 5px;
`

export const PropsText = styled.Text``

export const FootContainer = styled.View`
   flex-direction: row;
   justify-content: space-between;

   padding: 0 25px;
   background: #FF97B2;
   height: 80px;
`

export const Iconcontainer = styled.TouchableOpacity`
   align-items: center;
   justify-content: center;
`

export const Descript = styled.Text`
   font-size: 14px;
   margin-top:7px;
   color: #f2f2f2
`