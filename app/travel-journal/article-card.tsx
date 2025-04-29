interface ArticleCardProps {
  title: string;
  description: string;
  image: string;
  category: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  title,
  description,
  image,
  category,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col md:flex-row items-start gap-6">
      {/* Image */}
      <div className="w-full md:w-48 h-48 bg-emerald-600"></div>
      {/* Text */}
      <div className="flex-1">
        <span className="text-sm text-gray-500">{category}</span>
        <h2 className="text-xl font-bold text-gray-800 mt-1 mb-2">{title}</h2>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default ArticleCard;
