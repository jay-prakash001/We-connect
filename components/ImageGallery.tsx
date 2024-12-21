import { FlatList, Image, StyleSheet } from "react-native";


interface ImageGalleryProps {
    images: string[];
  }
const ImageGallery: React.FC<ImageGalleryProps> = ({images}) => {
    return (
      <FlatList
        data={images}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <Image source={{ uri: item }} style={[styles.image]} />
        )}
        keyExtractor={(item, index) => index.toString()}
        
      />
    );
  };

  const styles = StyleSheet.create({
    image: {    
        width: 200,
        height: 200,
        borderRadius: 8,
        marginRight: 8,
      },
  })

  export default ImageGallery