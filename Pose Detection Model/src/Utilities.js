// Utility function to get keypoint indices by side for the BlazePose model
export function getKeypointIndexBySide() {
    return {
      left: [11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31],  // Left-side keypoints
      right: [12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32], // Right-side keypoints
      middle: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]           // Central keypoints
    };
  }
  
  // Utility function to get adjacent keypoint pairs for drawing connections
  export function getAdjacentPairs() {
    return [
      [0, 1], [1, 2], [2, 3], [3, 7], [0, 4], [4, 5], [5, 6], [6, 8],
      [9, 10], [11, 13], [13, 15], [15, 17], [17, 19], [19, 21],
      [12, 14], [14, 16], [16, 18], [18, 20], [20, 22], [11, 12],
      [23, 24], [24, 26], [26, 28], [28, 30], [23, 25], [25, 27],
      [27, 29], [29, 31]
    ];
  }
  