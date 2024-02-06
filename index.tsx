import { View, Image, StyleProp, ViewStyle, ImageProps } from "react-native";
import React from "react";
import styles from "./styles";

interface Props {
  source: HTMLImageElement;
  rating: number;
  containerStyle?: StyleProp<ViewStyle>;
  iconContainerStyle?: StyleProp<ViewStyle>;
  imageStyle?: ImageProps;
}

const returnWidthFactor = (factor: number) => {
  if (factor < 5) return 3;
  if (factor === 5) return 2;
  if (factor > 5 && factor <= 7) return 1.5;
  if (factor > 7) return 1.2;
  return 1;
};

const Rating = ({
  source,
  rating = 5,
  containerStyle,
  iconContainerStyle,
  imageStyle,
}: Props) => {
  const generateRating = () => {
    if (rating % 1 === 0) {
      const ratingArray = Array.from({ length: rating }, (_, i) => {
        return { index: i };
      });
      return ratingArray.map(() => {
        return (
          <View
            style={[
              styles.imageContainer,
              iconContainerStyle && iconContainerStyle,
            ]}
          >
            <Image
              source={source}
              style={[styles.image, imageStyle && imageStyle]}
            />
          </View>
        );
      });
    } else {
      const fullIcons = rating.toString().split(".");
      const ratingArray = Array.from(
        { length: Number(fullIcons[0]) },
        (_, i) => {
          return { index: i };
        }
      );
      return (
        <>
          {ratingArray.map(() => {
            return (
              <View
                style={[
                  styles.imageContainer,
                  iconContainerStyle && iconContainerStyle,
                ]}
              >
                <Image
                  source={source}
                  style={[styles.image, imageStyle && imageStyle]}
                />
              </View>
            );
          })}
          <View
            style={[
              styles.imageContainer,
              {
                overflow: "hidden",
                width:
                  styles.image.width / returnWidthFactor(Number(fullIcons[1])),
              },
            ]}
          >
            <Image source={source} style={[styles.image]} />
          </View>
        </>
      );
    }
  };

  return (
    <View style={[styles.container, containerStyle && containerStyle]}>
      {source && generateRating()}
    </View>
  );
};

export default Rating;
