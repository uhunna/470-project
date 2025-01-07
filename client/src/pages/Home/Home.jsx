import React, { useState } from 'react';
import Background from '../../components/Background/Background';
import Hero from '../../components/Hero/Hero';

const heroData = [
  { text1: "Start building habits today!", text2: "Consistency is the key to success." },
  { text1: "Track your progress", text2: "Visualize your journey to success."},
  { text1: "Earn rewards", text2:  "Points and badges for your hard work!"},
  { text1: "Stay connected", text2: "Engage with the community for support." },
];

const Home = () => {
  const [heroCount, setHeroCount] = useState(0);

  return (
    <div>
      <Background heroCount={heroCount} />
      <Hero heroData={heroData} setHeroCount={setHeroCount} heroCount={heroCount} />
    </div>
  );
};

export default Home;
