#ifndef HEADER_H
# define HEADER_H
# define SET_X(x) ((float)x)
# define SET_Y(y) ((float)y / 1000)
# define GET_X(f) (int)(f)
# define GET_Y(f) (int)((f - (int)f) * 1000)

typedef struct			s_whouse
{
	int			       		id;
	int            		start_x;
	int								start_y;
	int								size_x;
  int            		size_y;
  struct s_whouse		*next;
}					        	t_whouse;

#endif
