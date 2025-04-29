interface ProvinceCardProps {
  name: string;
  description: string;
  image: string;
  id: string;
}

const ProvinceCard: React.FC<ProvinceCardProps> = ({
  name,
  description,
  image,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col md:flex-row items-start gap-6">
      {/* Text Section */}
      <div className="flex-1">
        <h2 className="text-xl font-bold text-gray-800 mb-4">{name}</h2>
        <p className="text-gray-600 mb-4">{description}</p>
      </div>
      {/* Image Placeholder */}
      <div className="w-full md:w-48 h-48 bg-gray-200 rounded-lg flex items-center justify-center">
        <img src={image} alt={name}></img>
      </div>
    </div>
  );
};

export default ProvinceCard;
