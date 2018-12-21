#ifndef HEADER_H
# define HEADER_H

typedef struct			s_ins
{
	char	            	must_finished;
	char	            	can_begin;
	int 								is_placed;
  struct s_ins			*next;
}					        	t_ins;

#endif
