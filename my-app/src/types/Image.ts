export type Image = {
  id: string;
  slug: string;
  downloads: string;
  likes: string;
  views: string;
  urls: urls;
  blur_hash: string;
};

type urls = {
  full: string;
  raw: string;
  regular: string;
  small: string;
};
