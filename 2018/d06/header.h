#ifndef HEADER_H
# define HEADER_H

typedef struct			s_coor
{
	char			       	id;
	int	            	start_x;
	int	            	start_y;
  struct s_coor			*next;
}					        	t_coor;

#endif
