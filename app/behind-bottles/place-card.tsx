interface PlaceCardProps {
  title: string;
  image: string;
}

const PlaceCard: React.FC<PlaceCardProps> = ({ title }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 flex flex-col items-center">
      <div className="h-[128px] w-full bg-emerald-800 rounded-2xl"></div>
      <h3 className="text-lg font-semibold text-gray-800 mt-2">{title}</h3>
    </div>
  );
};

export default PlaceCard;
