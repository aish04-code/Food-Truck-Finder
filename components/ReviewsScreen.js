// StAuth10244: I Aish Patel, 000902820 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else.

import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity} from 'react-native';

export default function ReviewsScreen() {
  const [reviewText, setReviewText] = useState(''); // State for the review input
  const [reviews, setReviews] = useState([]); // State to store all reviews
  const [rating, setRating] = useState(null); // State for rating

  const handleSubmitReview = () => {
    if (reviewText.trim() !== '' && rating) {
      setReviews((currentReviews) => [
        ...currentReviews,
        { id: Date.now().toString(), text: reviewText, rating },
      ]);
      setReviewText('');
      setRating(null); // Reset rating after submission
    } else {
      alert('Please enter a review and provide a rating.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Share Your Review</Text>
      <TextInput
        style={styles.input}
        placeholder="Write your review..."
        value={reviewText}
        onChangeText={setReviewText}
      />
      <Text style={styles.subtitle}>Rate your experience:</Text>
      <View style={styles.ratingContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity
            key={star}
            onPress={() => setRating(star)}
            style={[
              styles.star,
              rating === star && styles.selectedStar,
            ]}
          >
            <Text style={styles.starText}>{star}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Button title="Submit Review" onPress={handleSubmitReview} />
      <Text style={styles.reviewsTitle}>All Reviews:</Text>
      <FlatList
        data={reviews}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.reviewItem}>
            <Text style={styles.reviewText}>{item.text}</Text>
            <Text style={styles.reviewRating}>Rating: {item.rating} ⭐</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  star: {
    margin: 5,
    padding: 10,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  selectedStar: {
    backgroundColor: '#ffd700',
  },
  starText: {
    fontSize: 16,
    textAlign: 'center',
  },
  reviewsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  reviewItem: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  reviewText: {
    fontSize: 16,
  },
  reviewRating: {
    fontSize: 14,
    color: '#666',
  },
});
