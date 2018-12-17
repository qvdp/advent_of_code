#ifndef HEADER_H
# define HEADER_H
# define SET_X(x) (float)(x)
# define SET_Y(y) ((float)y / 1000)
# define GET_X(f) (int)(f)
# define GET_Y(f) (int)((f * 1000) - ((int)f * 1000))

typedef struct			s_coor
{
	char			       	id;
	float            	start;
  struct s_coor			*next;
}					        	t_coor;

#endif
