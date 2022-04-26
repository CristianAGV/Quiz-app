import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from "react-native";
import React, { useEffect, useState } from "react";
import LottieView from "lottie-react-native";

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

export default function Quiz({ navigation }) {
  const [questions, setQuestions] = useState();
  const [ques, setQues] = useState(0);
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const getQuiz = async () => {
    setIsLoading(true);
    const URL =
      "https://opentdb.com/api.php?amount=10&type=multiple&encode=url3986";
    const response = await fetch(URL);
    const data = await response.json();
    setQuestions(data.results);
    setOptions(generateOptionsAndShuffle(data.results[0]));
    setIsLoading(false);
  };

  useEffect(() => {
    getQuiz();
  }, []);

  const handleNextQuestion = () => {
    setQues((previousValue) => {
      return previousValue + 1;
    });

    setOptions(generateOptionsAndShuffle(questions[ques + 1]));
  };

  const generateOptionsAndShuffle = (_question) => {
    const options = [..._question.incorrect_answers];
    options.push(_question.correct_answer);
    shuffleArray(options);

    return options;
  };

  const handleSelectorOption = (_option) => {
    if (_option === questions[ques].correct_answer) {
      setScore((previousValue) => previousValue + 10);
    }
    if (ques !== 9) {
      handleNextQuestion();
    }
    if (ques === 9) {
      handleShowResults();
    }
  };

  const handleShowResults = () => {
    navigation.navigate("Result", { score });
  };

  return (
    <View style={styles.container}>
      {isLoading && (
        <LottieView source={require("../assets/loading.json")} autoPlay />
      )}
      {questions && (
        <>
          <View style={styles.top}>
            <Text style={styles.question}>
              Q. {decodeURIComponent(questions[ques].question)}
            </Text>
          </View>
          <View style={styles.options}>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => {
                handleSelectorOption(options[0]);
              }}
            >
              <Text style={styles.option}>
                {decodeURIComponent(options[0])}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => {
                handleSelectorOption(options[1]);
              }}
            >
              <Text style={styles.option}>
                {decodeURIComponent(options[1])}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => {
                handleSelectorOption(options[2]);
              }}
            >
              <Text style={styles.option}>
                {decodeURIComponent(options[2])}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => {
                handleSelectorOption(options[3]);
              }}
            >
              <Text style={styles.option}>
                {decodeURIComponent(options[3])}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttons}>
            {ques !== 9 && (
              <TouchableOpacity
                style={styles.button}
                onPress={handleNextQuestion}
              >
                <Text style={styles.buttonText}>Skip</Text>
              </TouchableOpacity>
            )}
            {ques === 9 && (
              <TouchableOpacity
                style={styles.button}
                onPress={handleShowResults}
              >
                <Text style={styles.buttonText}>Show Results</Text>
              </TouchableOpacity>
            )}
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight,
    paddingHorizontal: 16,
    height: "100%",
    backgroundColor: "#A5C4D4",
  },
  top: {
    marginVertical: 16,
  },
  options: {
    marginVertical: 16,
    flex: 1,
  },
  buttons: {
    marginBottom: 12,
    paddingVertical: 16,
    flexDirection: "row",
    justifyContent: "center",
  },
  button: {
    padding: 12,
    paddingHorizontal: 16,
    marginBottom: 30,
    borderRadius: 16,
    alignItems: "center",
    backgroundColor: "#1A759F",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "white",
  },
  question: {
    fontSize: 28,
  },
  optionButton: {
    padding: 12,
    marginVertical: 6,
    backgroundColor: "#34A0A4",
    borderRadius: 12,
  },
  option: {
    fontSize: 18,
    fontWeight: "500",
    color: "white",
  },
});
