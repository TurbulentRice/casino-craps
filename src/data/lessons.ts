/**
 * Tutorial Lessons Data
 */

import { Lesson } from '../types/tutorial';

export const lessons: Lesson[] = [
  {
    id: 'basics',
    number: 1,
    title: 'The Basics',
    description: 'Game objective, dice rules, and the come-out roll',
    duration: '5 min',
    difficulty: 'beginner',
    steps: [
      {
        id: 'basics-1',
        type: 'explanation',
        title: 'Welcome to Craps!',
        content: 'Craps is one of the most exciting casino games. The game is played with two dice, and players bet on the outcome of the roll.\n\nThe shooter (the person rolling the dice) and other players can place various bets on the table before each roll.',
        tips: [
          'Craps has some of the best odds in the casino',
          'The game moves quickly - don\'t be intimidated!',
          'Start with simple bets like Pass Line',
        ],
      },
      {
        id: 'basics-2',
        type: 'explanation',
        title: 'The Come-Out Roll',
        content: 'The game starts with a come-out roll. This is the first roll of a new round.\n\nOn the come-out roll:\n• Rolling 7 or 11 = WIN (Natural)\n• Rolling 2, 3, or 12 = LOSE (Craps)\n• Any other number (4, 5, 6, 8, 9, 10) establishes the POINT',
        tips: [
          '7 and 11 are winners on come-out',
          '2, 3, and 12 are losers (craps)',
          'Other numbers become the point',
        ],
      },
      {
        id: 'basics-3',
        type: 'quiz',
        title: 'Test Your Knowledge',
        content: 'Let\'s see if you understand the come-out roll!',
        quiz: {
          question: 'On the come-out roll, what happens if you roll a 7?',
          options: [
            'You lose',
            'You win (Natural)',
            'It establishes the point',
            'Nothing happens',
          ],
          correctAnswer: 1,
          explanation: 'Rolling a 7 on the come-out roll is called a Natural and means you WIN!',
        },
      },
      {
        id: 'basics-4',
        type: 'quiz',
        title: 'More Practice',
        content: 'One more question to reinforce what you learned.',
        quiz: {
          question: 'Which of these numbers establishes a point?',
          options: [
            '7',
            '11',
            '6',
            '2',
          ],
          correctAnswer: 2,
          explanation: 'The number 6 establishes a point. The numbers 4, 5, 6, 8, 9, and 10 all establish points when rolled on the come-out roll.',
        },
      },
    ],
  },
  {
    id: 'pass-line',
    number: 2,
    title: 'Pass Line Bet',
    description: 'The most fundamental bet in craps',
    duration: '7 min',
    difficulty: 'beginner',
    prerequisites: ['basics'],
    steps: [
      {
        id: 'pass-1',
        type: 'explanation',
        title: 'The Pass Line',
        content: 'The Pass Line is the most popular bet in craps and offers excellent odds.\n\nYou win on the come-out roll if:\n• 7 or 11 is rolled\n\nYou lose on the come-out roll if:\n• 2, 3, or 12 is rolled\n\nIf any other number is rolled, that becomes the point.',
        tips: [
          'Pass Line has only 1.41% house edge',
          'This is one of the best bets in the casino',
          'You\'re betting WITH the shooter',
        ],
      },
      {
        id: 'pass-2',
        type: 'explanation',
        title: 'After the Point',
        content: 'Once the point is established, the goal changes:\n\nYou win if:\n• The point number is rolled again before a 7\n\nYou lose if:\n• A 7 is rolled before the point number\n\nThis is called "making the point" or "sevening out."',
        tips: [
          'After the point, 7 becomes your enemy',
          'The puck marked "ON" shows the point number',
          'Other numbers don\'t affect your Pass Line bet',
        ],
      },
      {
        id: 'pass-3',
        type: 'quiz',
        title: 'Understanding Pass Line',
        content: 'Test your understanding of the Pass Line bet.',
        quiz: {
          question: 'You have a Pass Line bet and the point is 6. What do you want to roll?',
          options: [
            'A 7',
            'A 6',
            'Any number except 7',
            'It doesn\'t matter',
          ],
          correctAnswer: 1,
          explanation: 'You want to roll the point number (6) before rolling a 7. Rolling 6 wins, rolling 7 loses.',
        },
      },
      {
        id: 'pass-4',
        type: 'interactive',
        title: 'Practice: Place a Pass Line Bet',
        content: 'Now let\'s practice placing a Pass Line bet on the table.',
        interactiveDemo: {
          type: 'bet-placement',
          instructions: 'Tap on the Pass Line area to place your bet.',
          successMessage: 'Perfect! You\'ve placed a Pass Line bet.',
          errorMessage: 'That\'s not the Pass Line. Look for the area labeled "PASS LINE" at the bottom of the table.',
        },
      },
    ],
  },
  {
    id: 'the-point',
    number: 3,
    title: 'The Point',
    description: 'Understanding the point phase',
    duration: '6 min',
    difficulty: 'beginner',
    prerequisites: ['pass-line'],
    steps: [
      {
        id: 'point-1',
        type: 'explanation',
        title: 'What is the Point?',
        content: 'The point is a number (4, 5, 6, 8, 9, or 10) that\'s established on the come-out roll.\n\nWhen a point is set:\n• The dealer moves the puck to that number and flips it to "ON"\n• The game enters the "point phase"\n• Pass Line bets now win if the point is rolled\n• Pass Line bets lose if 7 is rolled (seven-out)',
        tips: [
          'The white puck shows which number is the point',
          'ON = point is active, OFF = come-out roll',
          '6 and 8 are the most common points',
        ],
      },
      {
        id: 'point-2',
        type: 'explanation',
        title: 'Point Odds',
        content: 'Different point numbers have different probabilities:\n\n• 6 or 8: 5 ways to make, 6 ways to seven-out\n• 5 or 9: 4 ways to make, 6 ways to seven-out\n• 4 or 10: 3 ways to make, 6 ways to seven-out\n\nThis is why some players prefer when 6 or 8 is the point!',
        tips: [
          'There are always 6 ways to roll a 7',
          '6 and 8 are easier to make than 4 and 10',
          'Understanding odds helps you bet smarter',
        ],
      },
      {
        id: 'point-3',
        type: 'quiz',
        title: 'Point Knowledge Check',
        content: 'Let\'s verify you understand the point phase.',
        quiz: {
          question: 'The point is 8. What ends the round?',
          options: [
            'Only rolling an 8',
            'Only rolling a 7',
            'Rolling either 8 or 7',
            'Rolling any number',
          ],
          correctAnswer: 2,
          explanation: 'The round ends when either the point (8) or a 7 is rolled. Rolling 8 wins Pass Line bets, rolling 7 loses.',
        },
      },
    ],
  },
  {
    id: 'dont-pass',
    number: 4,
    title: 'Don\'t Pass Bet',
    description: 'Betting against the shooter',
    duration: '6 min',
    difficulty: 'intermediate',
    prerequisites: ['the-point'],
    steps: [
      {
        id: 'dont-1',
        type: 'explanation',
        title: 'Betting the Dark Side',
        content: 'The Don\'t Pass bet is the opposite of the Pass Line. You\'re betting against the shooter.\n\nOn the come-out roll:\n• You WIN if 2 or 3 is rolled\n• You LOSE if 7 or 11 is rolled\n• 12 is a PUSH (tie)\n• Other numbers establish the point',
        tips: [
          'Don\'t Pass has slightly better odds (1.36% house edge)',
          'Some players consider it bad luck to bet Don\'t Pass',
          'You\'re hoping for a seven-out after the point',
        ],
      },
      {
        id: 'dont-2',
        type: 'explanation',
        title: 'After the Point (Don\'t Pass)',
        content: 'Once the point is established:\n\nYou WIN if:\n• A 7 is rolled before the point\n\nYou LOSE if:\n• The point is rolled before a 7\n\nThis is the opposite of the Pass Line bet!',
        tips: [
          'After point, you want a 7',
          'You\'re betting with the house',
          'Mathematically slightly better than Pass Line',
        ],
      },
      {
        id: 'dont-3',
        type: 'quiz',
        title: 'Don\'t Pass Quiz',
        content: 'Test your understanding of Don\'t Pass betting.',
        quiz: {
          question: 'On the come-out roll, what happens if you roll a 12 with a Don\'t Pass bet?',
          options: [
            'You win',
            'You lose',
            'It\'s a push (tie)',
            'It establishes the point',
          ],
          correctAnswer: 2,
          explanation: 'Rolling 12 on the come-out roll is a push (tie) for Don\'t Pass bets. This is how the casino maintains its edge.',
        },
      },
    ],
  },
  {
    id: 'place-bets',
    number: 5,
    title: 'Place Bets',
    description: 'Betting on specific numbers',
    duration: '8 min',
    difficulty: 'intermediate',
    prerequisites: ['the-point'],
    steps: [
      {
        id: 'place-1',
        type: 'explanation',
        title: 'What are Place Bets?',
        content: 'Place bets let you bet on specific numbers (4, 5, 6, 8, 9, 10) to be rolled before a 7.\n\nYou can make place bets:\n• During the point phase\n• On multiple numbers at once\n• Turn them on/off at any time',
        tips: [
          'Place bets are only active during point phase',
          'You can bet on the point number itself',
          '6 and 8 have the best odds',
        ],
      },
      {
        id: 'place-2',
        type: 'explanation',
        title: 'Place Bet Payouts',
        content: 'Different numbers pay different amounts:\n\n• Place 6 or 8: Pays 7:6\n• Place 5 or 9: Pays 7:5\n• Place 4 or 10: Pays 9:5\n\nBest strategy: Focus on 6 and 8 (1.52% house edge)',
        tips: [
          'Always bet in multiples of $6 for 6/8',
          'Place bets stay up until they win or seven-out',
          'You can take down place bets anytime',
        ],
      },
      {
        id: 'place-3',
        type: 'quiz',
        title: 'Place Bet Quiz',
        content: 'Test your place bet knowledge.',
        quiz: {
          question: 'Which place bet has the lowest house edge?',
          options: [
            'Place 4',
            'Place 5',
            'Place 6 or 8',
            'Place 10',
          ],
          correctAnswer: 2,
          explanation: 'Place 6 and Place 8 have the lowest house edge at 1.52%, making them the best place bets.',
        },
      },
    ],
  },
];

// Get lesson by ID
export function getLessonById(id: string): Lesson | undefined {
  return lessons.find(lesson => lesson.id === id);
}

// Get lessons by difficulty
export function getLessonsByDifficulty(difficulty: Lesson['difficulty']): Lesson[] {
  return lessons.filter(lesson => lesson.difficulty === difficulty);
}

// Check if prerequisites are met
export function canAccessLesson(lessonId: string, completedLessons: string[]): boolean {
  const lesson = getLessonById(lessonId);
  if (!lesson) return false;

  if (!lesson.prerequisites || lesson.prerequisites.length === 0) {
    return true;
  }

  return lesson.prerequisites.every(prereq => completedLessons.includes(prereq));
}
