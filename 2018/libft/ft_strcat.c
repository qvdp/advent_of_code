/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_strcat.c                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: qvan-der <marvin@42.fr>                    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/11/08 12:01:01 by qvan-der          #+#    #+#             */
/*   Updated: 2018/11/12 20:41:34 by qvan-der         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "libft.h"

char	*ft_strcat(char *s1, char *s2)
{
	size_t	length_s1;
	size_t	length_s2;
	size_t	i;

	length_s1 = ft_strlen(s1);
	length_s2 = ft_strlen(s2);
	i = 0;
	while (i < length_s2)
	{
		s1[length_s1 + i] = s2[i];
		i++;
	}
	s1[length_s1 + i] = '\0';
	return (s1);
}
