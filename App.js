import React from 'react';
import {
  ActivityIndicator,
  Button,
  Clipboard,
  Image,
  Share,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View,
 
} from 'react-native';
import {
 
  ImagePicker,
  Speech
} from 'expo';

import Modal from 'react-native-modal'; // 3.1.0



 

const WORDS =[
  'so whats on menu , oh its a ',
  'it must be a ',
  'there you go, its a',
  'it seems like a ',
  'i am not sure what it is , some kind of ',
  'it has to be  a',
  'i see a ',
  'lets assume its a ',
  'come on its a ',
  'i think i see a',
  'obviously its a ',
  'i am done with these games , cant you see its a '


];

export default class App extends React.Component {
  state = {
    image: null,
    uploading: false,
    label: null,
    label2:null,
    textReady: false,
    speechReady:false,
    modalvis:false,
    lang:'en',
    
   
    
  }


    render() {
    let { image } = this.state;
    //button controls

    return (
      <View style={{ flex:1, alignItems: 'center'}}>
        <View style={{
                  flexDirection:'row',
                  top:20,
        }}>
        <View style={{}}>
        <Text style={{fontFamily:'sans-serif-thin',
                      fontSize:40,
                    
        }}>
          snaplate
        </Text>  
        </View>
       
        </View>
        
        {this._maybeRenderImage()}
        {this._maybeRenderUploadingOverlay()}
        {this._renderText()}
        
         
         <View style={{
                      position:'absolute',
                      flexDirection:'row',
                      bottom:25,
                     
               
                        
       }}>

       <View style={{position:"absolute",right:135}}>
        <TouchableHighlight onPress={this._renderModal} underlayColor={'#fff'} >
         <Image 
            style={{width:60,height:60}}
            source={require('./assets/tra.png')}
            />
            </TouchableHighlight>
        </View>
       <View>  
       <TouchableHighlight onPress={this._takePhoto} activeOpacity={10} underlayColor={'#fff'} >
         <Image 
            style={{width:60,height:60}}
            source={require('./assets/camera.png')}
            />
            </TouchableHighlight>
            </View>
            <View style={{
              position:'absolute',
              left:135}}>
            <TouchableHighlight onPress={this._pickImage} underlayColor={'#fff'} >
         <Image 
            style={{width:60,height:60}}
            source={require('./assets/galbue.png')}
            />
            </TouchableHighlight>
        
            </View>
            
          
      </View>
      
      <Modal isVisible={this.state.modalvis} style={styles.bottomModal} >
          {this._renderModalContent()}
        </Modal>
       
      
       
       
       
        <StatusBar barStyle="default" />
      
      </View>
    );
  }

    _renderModal =() => {
      if(!this.state.modalvis)
      this.setState({modalvis:true});
      else
      this.setState({modalvis:false});
      
    }

    _setlangen= ()=>
    {
      this.setState({lang:'en'});
      this._renderModal();
      
      
      console.log(this.state.lang);
    }
    _setlanghi= ()=>
    {
      this.setState({lang:'hi'});

      this._renderModal();
      
      console.log(this.state.lang);
    }
    _setlangja= ()=>
    {
      this.setState({lang:'ja'});
      this._renderModal();
      
      
      console.log(this.state.lang);
    }
    _renderModalContent = () => {
      return(
      <View style={styles.modalContent}>
        
        <View style={{}}>
        <Button onPress={this._setlangen} title="english" />
        <Button onPress={this._setlanghi} title="hindi" />
        <Button onPress={this._setlangja} title="japanese" />
        </View>
        
        </View>
      );
  }
    _maybeRenderUploadingOverlay = () => {
    if (this.state.uploading) {
      return (
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: 'rgba(0,0,0,0.4)',
              alignItems: 'center',
              
            },
          ]}>
          <ActivityIndicator style={{marginTop:250,}}color="#fff"  size="large" />
        </View>
      );
    }
  };
  //render image
  _maybeRenderImage = () => {
    let { image } = this.state;
    if (!image) {
      
      return;
    }
   // console.log(this.state);
    //console.log(this.state.uploading);
    //console.log(this.state.image.uploading);
   
    //afteredits chutiyap
    return (
      //<View
       /* style={{
          marginTop: 30,
          width: 250,
          borderRadius: 3,
          elevation: 2,
          shadowColor: 'rgba(0,0,0,1)',
          shadowOpacity: 0.2,
          shadowOffset: { width: 4, height: 4 },
          shadowRadius: 5,
        }}
        *///>
        <View
          style={{
            marginTop: 30,
            borderTopRightRadius: 3,
            borderTopLeftRadius: 3,
            overflow: 'visible',
          }}>
          <Image source={{ uri: image}} style={{height:400,width:340, }} />
           
        </View>
       
        
     // </View>
      
    );
    console.log(image);
  };
  
  _renderText = () => {
    if(!this.state.textReady) {
      return;
    } 
    console.log("called");
    if(this.state.speechReady)
      { this.setState({speechReady:false});
      if(this.state.lang=='en')
      {
      Speech.speak(WORDS[Math.floor(Math.random() * 9) + 1 ]+this.state.label,{
      language: 'en',
      pitch: 1.2,
      rate:0.80,
      }); 
      } 

      else
      {
        Speech.speak(this.state.label2,{
          language:this.state.lang,
          pitch:1.2,
          rate:0.80,  
        });

      }
      }
    return(
      <View>
         <Text
          //onPress={this._copyToClipboard}
          //onLongPress={this._share}
          style={{  
          fontSize:20,fontFamily:'sans-serif-thin'}}>
          {this.state.label}
          </Text>
            <Text
            style={{ 
          fontSize:20,fontFamily:'sans-serif-thin'

            }}>
          {this.state.label2}   
          </Text>
        
      </View>
      );
      
  };

   
  


  _takePhoto = async () => {
    let pickerResult = await ImagePicker.launchCameraAsync({
   
    });
   
    this._handleImagePicked(pickerResult);

  }

  _pickImage = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      
    });

    this._handleImagePicked(pickerResult);
  }


 _handleImagePicked = async pickerResult => {
    let uploadResponse, uploadResult;
    let classifyResponse ,classifyResult;
    let translated;
    
      this.setState({ image: pickerResult.uri });
      this.setState({label:null});
        this.setState({label2:null})
    try {
      this.setState({ uploading: true });

      if (!pickerResult.cancelled) {
        console.log("upload function called")
        uploadResponse = await uploadImageAws(pickerResult.uri);
        console.log('after upload');
       // console.log(uploadResponse);
        //console.log('afterupload');

        uploadResult = await uploadResponse.json();
        console.log(uploadResult);
       console.log('fetch retuuuurned');
        
     //   console.log(uploadResult.location);
        
        classifyResponse = await uploadImageAsync(uploadResult.imageUrl);
        classifyResult = await  classifyResponse.json();
        console.log(classifyResult);
        console.log(classifyResult.responses[0].labelAnnotations[0].description);
       this.setState({label:classifyResult.responses[0].labelAnnotations[0].description});    
        //console.log(classifyResult.responses[0].labelAnnotations[1].description);
         //this.setState({label2:classifyResult.responses[0].labelAnnotations[1].description});
         //--//tihis.setState({textReady:true});
         //----//this.setState({speechReady:true});
        if(this.state.label=="text")
          {
            console.log("this is aa text");
          }
        if(this.state.lang!=='en')
        {  console.log( "translation");
          translated= await translate(classifyResult.responses[0].labelAnnotations[0].description,this.state.lang);
          let tt= await translated.json();
          console.log("successfully translated");
          this.setState({label2:tt.data.translations[0].translatedText});
          console.log(this.state.label2);
          console.log("translated state set");
         // console.log(tt.data.translations[0].translatedText);

        }
        this.setState({textReady:true});
        this.setState({speechReady:true});
      }
    } catch (e) {
      console.log({ uploadResponse });
      console.log({ uploadResult });
      console.log({ e });
      alert('Upload failed, sorry :(');
    } finally {
      this.setState({ uploading: false });
    }
  };
}
/*async function uploadImageAws(uri) {
  console.log('started');
  let url = 'https://file-upload-example-backend-dkhqoilqqn.now.sh/upload';
  let uriParts = uri.split('.');
  let fileType = uri[uri.length - 1];
  let formData = new FormData();
  formData.append('photo', {
    uri,
    name: `photo.${fileType}`,
    type: `image/${fileType}`,
  });
  let options ={
    method:'POST',
    body:formData,
    headers:{
      'Accept':'application/json',
      'Content-Type':'multipart/form-data',
    },
    
  };
  return fetch(url,options);
}
*/

async function uploadImageAws(uri) {
  console.log('started');
  let url = 'https://snapback-uitbmtqmmo.now.sh/image-upload';
  
  let fileType = uri[uri.length - 1];
  let formData = new FormData();
  let image = {
    uri:uri,
    type:'image/jpeg',
    name:'image.jpg'
  }
  formData.append('image',image);
  let options ={
    method:'POST',
    body:formData,
    headers:{
      'Accept':'application/json',
      'Content-Type':'multipart/form-data',
    },
    
  };
  return fetch(url,options);
}

//test uploading
async function uploadImageAsync(uri) {
  console.log('uploadImageAsync started');
  
  let apiUrl =
    'https://vision.googleapis.com/v1/images:annotate?key=AIzaSyD2NNEd1lKIfEpzPNuB0DSCDAuljbDhwb0';
  //console.log(apiUrl);
 
  //console.log(formData);
  let options = {
    method: 'POST',
    //body: formData,
    body: JSON.stringify({
      requests: [
        {
          features: [
            {
              type: 'LABEL_DETECTION',
              maxResults: 3,
            },
          ],
          image: {
            source: {
              image_uri:uri,
            },
          },
        },
      ],
    }),

    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };
//  console.log('reached upload state');
//  console.log(options);
  //console.log(uri);

  return fetch(apiUrl, options);
//  console.log('fetch returned');
}

async function translate(text,lang)
{   console.log("translation start");
   let api='https://translation.googleapis.com/language/translate/v2?key=AIzaSyD2NNEd1lKIfEpzPNuB0DSCDAuljbDhwb0&q='+text+'&target='+lang;
   return fetch(api);
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'red'
  },
  button: {
    backgroundColor: 'lightblue',
    padding: 12,
    margin: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent:{
    backgroundColor:"white",
    padding:22,
    
    alignItems:"center",
    borderRadius:10
  }

});