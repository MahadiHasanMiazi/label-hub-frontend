import "./PillBadge.css";
import { AiOutlineClose } from "react-icons/ai";

interface PillBadgeProps {
  name: string;
  id?: number
  cross?: any;
  className?: string
  handleCancel?: any
}

export const PillBadge: React.FC<PillBadgeProps> = ({ name , id, cross, className, handleCancel}) => {
  return (
  
      <span className={`mx - 2 my-1 pillBadge-container ${className}`}>{name}
          {(cross && cross === 'AiOutlineClose') ?
              <AiOutlineClose className='cross-icon' onClick={() =>handleCancel(id)}></AiOutlineClose> : ''
          }


      </span>
    
  );
};
