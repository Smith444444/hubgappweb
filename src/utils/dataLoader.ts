import * as XLSX from 'xlsx';

export interface UserData {
  user_name: string;
  user_image: string;
  video_title: string;
  video_link: string;
}

export interface User {
  name: string;
  image: string;
  videos: Array<{
    title: string;
    link: string;
  }>;
}

export const loadData = async (): Promise<User[]> => {
  try {
    // Try to load Excel file first
    const response = await fetch('/data.xlsx');
    if (response.ok) {
      const arrayBuffer = await response.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData: UserData[] = XLSX.utils.sheet_to_json(worksheet);
      
      return processUserData(jsonData);
    }
  } catch (error) {
    console.log('Excel file not found, trying JSON fallback...');
  }

  // Fallback to JSON file
  try {
    const response = await fetch('/data.json');
    const jsonData: UserData[] = await response.json();
    return processUserData(jsonData);
  } catch (error) {
    console.error('Failed to load data:', error);
    return [];
  }
};

const processUserData = (rawData: UserData[]): User[] => {
  const userMap = new Map<string, User>();

  rawData.forEach(item => {
    if (!userMap.has(item.user_name)) {
      userMap.set(item.user_name, {
        name: item.user_name,
        image: item.user_image,
        videos: []
      });
    }

    const user = userMap.get(item.user_name)!;
    user.videos.push({
      title: item.video_title,
      link: item.video_link
    });
  });

  return Array.from(userMap.values());
};