## Inspiration
News nowadays are fragmented and live in the moment - relevant for a day at most and then replaced by new stories. This makes it hard to keep up with so many news stories unfolding at the same time.

## What it does
Our solution analyzes a big number of news articles and offers a new way to browse the news based on topics. It automatically extracts keywords from articles using TF-IDF and thus offers a unique perspective on the big picture of news stories. All of this is combined into a beautiful and intuitive UI.

## How we built it

For the representation of the different generated news topics and their relations, we employed a heavily modified version of the particles.js library. This allows for a playful experience while discovering new and interesting topics. This interface offers a dynamic flow through topics leaving and new ones entering.

We developed a custom page ranking algorithm, which allows smart searching and aggregation of news articles. The TF-IDF statistical algorithm is used to extract topics from news articles.

## Challenges we ran into

Due to time limitations, we had to cut back on the model development and thus couldn’t finish the topic relationship prediction.

## Accomplishments that we're proud of

We’re happy with the UI concept we managed to implement. It provides a solid basis for displaying aggregated news sorted by topics.
The page ranking algorithm in combination with TF-IDF statistical analysis shows promising results for AI-driven news aggregation.

## What we learned

We gained a new perspective on news consumption and exploration of news topics and gained further experience with utilizing tf-idf analysis and developing page rank algorithms.

## What's next for NewsRetrieval

Proper implementation of cross topic navigation.
